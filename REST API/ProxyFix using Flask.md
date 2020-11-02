### ProxyFix using Flask

### 문제점

Running a secure HTTPS website is important, but encrypting and decrypting HTTPS traffic is computationally expensive. Many people running large-scale websites (including [Heroku](https://www.heroku.com/)) use a [TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy) to reduce load on the HTTP server**. This works great, but means that the webserver running your Flask application is actually speaking HTTP, not HTTPS.** As a result, Flask-Dance can get confused, and generate callback URLs that have an `http://` scheme, instead of an `https://` scheme. This is bad, because OAuth requires that all connections use HTTPS for security purposes, and OAuth providers will reject requests that suggest a callback URL with a `http://` scheme.

### 해결방안 (ProxyFix 사용이유)

Fortunately, the fix for this problem is simple: we can just inform Flask that it is running behind a proxy. This will allow Flask to discover that the user *actually* requested the site from `https://`, and as a result, Flask-Dance will be sure to generate callback URLs that have an `https://` schema. All you have to do is wrap your application with Werkzueg’s [`ProxyFix`](http://werkzeug.pocoo.org/docs/contrib/fixers/#werkzeug.contrib.fixers.ProxyFix) middleware, like so:

```python
from flask import Flask
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
```

After you define your Flask application, usually stored in a variable called `app`, just wrap the `app.wsgi_app` parameter in the [`ProxyFix`](http://werkzeug.pocoo.org/docs/contrib/fixers/#werkzeug.contrib.fixers.ProxyFix) middleware. This will teach Flask how to determine whether the request actually came in via HTTP or HTTPS, so that any part of your website that uses that information (including Flask-Dance) can work correctly.



### 참조문서

- https://flask-dance.readthedocs.io/en/v0.13.0/proxies.html

### 관련문서

- https://flask-dance.readthedocs.io/en/v0.13.0/proxies.html
- https://werkzeug.palletsprojects.com/en/1.0.x/middleware/proxy_fix/
- https://flask.palletsprojects.com/en/1.1.x/deploying/wsgi-standalone/#deploying-proxy-setups

