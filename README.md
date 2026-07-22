# Japan Law Viewer

## Detail
You can check Japanese laws more quickly than on the government’s website.

## System
Builded by Vite+React+TypeScript
### Laws 
This information is obtained from the legislation API
[法令API]("https://laws.e-gov.go.jp/api/2/swagger-ui/") (e-gov website)
The Laws index is updated once a day at 00:00 Japan Standard Time via GitHub Actions.
The search index is initially created locally using MiniSearch every time you open the website. This enables extremely fast and accurate searches.

## Progress
The laws reference system is currently being developed.