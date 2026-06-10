# yy-read-xlsx scripts

`read_xlsx.py` 使用 Python 标准库读取 `.xlsx` 工作簿内容，适合在技能执行时将工作表输出为 Markdown、JSON 或文本。

## 常用命令

```powershell
npm run ready
npm run lint
python read_xlsx.py --file "workbook.xlsx" --format markdown
python read_xlsx.py --file "workbook.xlsx" --sheet "Sheet1" --format json
python read_xlsx.py --file "workbook.xlsx" --format markdown --forward-fill --fill-columns "0,1"
```

## 说明

- 不依赖第三方包。
- 不还原样式、图表、图片和筛选器。
- 公式单元格只读取文件中已有的缓存值，不重新计算公式。
