export const objectToCsvString = (
  data: readonly {
    [key: string]: any
  }[],
) => {
  const csvPrefix = 'data:text/csv;charset=utf-8,'
  const csvHeaders: string[] = Object.keys(data[0])
  const csvArray: string[][] = [
    csvHeaders,
    ...data.map(row => {
      const rowArray: string[] = []
      for (let header of csvHeaders) {
        rowArray.push(row[header])
      }
      return rowArray
    }),
  ]
  return csvPrefix + csvArray.map(row => row.join(',')).join('\n')
}

export const handleDownloadCsv = (csvString: string, graphType: string) => {
  const encodedUri = encodeURI(csvString)

  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', encodedUri)
  downloadLink.setAttribute('download', `my_graph_${graphType}.csv`)
  document.body.appendChild(downloadLink)

  downloadLink.click() // This will download the data file named "my_data.csv".

  document.body.removeChild(downloadLink)
}
