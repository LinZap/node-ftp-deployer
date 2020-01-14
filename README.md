# FTP-Deployer

FTP-Deployer 是一個基於 FTP 的檔案傳輸工具，您可以透過簡單的設定快速傳輸兩個主機之間的資料。

## Installation

```
npm install -g ftp-deployer
```

## Usage 

假設我們要將 `localhsot` 上的 `./myproject` 佈署到 `192.168.1.1` 主機上的 `/var/www`

> 兩台主機都必須安裝 `FTP-Deployer`

### Server-Side 伺服端

啟動 FTP Server

```
dep server -h 192.168.1.1 -p 888 -d /var/www/html
```

> 請注意若沒有指定 `-p` 連接埠，預設會開啟 `21`，請注意防火牆是否能允許通過。

output:

```
FTP-Server listening on 127.0.0.1 port 21
Root Path at: /var/www
```

#### 詳細參數如下

 option | short | description 
--- | --- | ---
 --host | -h | 指定 Server IP，預設為 `127.0.0.1` (localhost) 
 --port | -p | 指定 Server Port，預設為 `21` (FTP) 
 --dir | -d | 指定 FTP Server 的根目錄，預設為當前目錄 



### Client-Side 使用端

傳送目錄下的所有檔案到 `192.168.1.1` Server
```
dep publish -d ./myproject -h 192.168.1.1
```

output:
```
[success] \index.php
[success] \server.php
end
close
```

#### 詳細參數如下


| option | short | description 
--- | --- | ---
 --host | -h | 指定欲傳送到的 IP，預設為 `127.0.0.1` (localhost) 
 --port | -p | 指定欲傳送到的 port，預設為 `21` (FTP) 
 --dir | -d | 指定目錄 (目錄下的所有檔案會被傳送)，預設為當前目錄 
 --ignore | -i | 指定欲忽略部傳送的檔案，預設不忽略任何檔案 (可以使用`*`來進行模糊匹配) 


### Ignore files 忽略傳送特定檔案

如果有某些檔案不想上傳，可以使用 `--ignore` 或 `-i` 來進行設定

```
dep publish -h 192.168.1.1 -p 888 -d ./myproject -i app.config *.xml
```

> 所有 `app.config` 與 副檔名為 `.xml` 的檔案，都不會被傳送


### Will Be Uploaded 確認哪些檔案會被上傳

```
dep status
```

output:

```
[Publish files]
 \fr000056.xml
 \fr000057.xml
 \fr000058.xml
```

## Configuration File

在任意執行位置，放置設定檔，就可以不需要每次都輸入參數：

### Server-Side

設定檔案名稱必須為 **`server.json`**
```json
{
  "host": "127.0.0.1",
  "port": 21,
  "rootdir": "."
}
```

### Client-Side

設定檔案名稱必須為 **`publish.json`**
```json
{
  "host": "192.168.1.1",
  "port": 21,
  "rootdir": ".",
  "ignore": [".git", "node_modules", "*.setting"]
}
```

#### 注意事項

* 若您撰寫了設定檔則不需要在執行加註 option  
* 但若也在 CLI 中設定 option **會覆蓋設定檔中的內容**  
* 設定檔中的項目皆為可選，若無設定會使用預設參數


## LICENSE

```
Copyright (C) 2020 ZapLin

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
