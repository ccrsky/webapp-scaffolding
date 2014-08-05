1. 修改路由
route -p add 192.168.11.0 mask 255.255.255.0 192.168.109.1 if 10

2.修改nginx
location /api/ {
	proxy_pass http://192.168.11.199;
}

3.doc是文档
