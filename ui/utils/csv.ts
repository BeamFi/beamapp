export function makeCSV(content) {
  let csv = ""
  content.forEach(value => {
    value.forEach((item, i) => {
      const innerValue = item === null ? "" : item.toString()
      let result = innerValue.replace(/"/g, '""')
      if (result.search(/("|,|\n)/g) >= 0) {
        result = '"' + result + '"'
      }
      if (i > 0) {
        csv += ","
      }
      csv += result
    })
    csv += "\n"
  })
  return csv
}
