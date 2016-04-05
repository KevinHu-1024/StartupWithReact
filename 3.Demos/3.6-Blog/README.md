## Github API

### 获得某个仓库的全部issue

    GET /repos/:owner/:repo/issues

### 获得某个仓库的单个issue

    GET /repos/:owner/:repo/issues/:number

### 获得某个仓库的某个issue下面的所有评论

    GET /repos/:owner/:repo/issues/:number/comments

> **Note:** 

> In the past, pull requests and issues were more closely aligned than they are now. As far as the API is concerned, every pull request is an issue, but not every issue is a pull request.

> This endpoint may also return pull requests in the response. If an issue is a pull request, the object will include a `pull_request` key.

## 示例

### 配置文件

```javascript
var _config = {
    owner:'lifesinger', 
    repo:'lifesinger.github.com', 
    number:164
};
```

### 获得某个仓库的全部issue

```javascript
function get(){
    $.ajax({                 
        url:"https://api.github.com/repos/"+_config['owner']+"/"+_config['repo']+"/issues",
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }
    });
}
```
### 获得某个仓库的单个issue

```javascript
function getOneIssue(){
    $.ajax({                 
        url:"https://api.github.com/repos/"+_config['owner']+"/"+_config['repo']+"/issues/"+_config['number'],
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }
    });
}
```

### 获得某个仓库的某个issue下面的所有评论

```javascript
function getCommits(){
    $.ajax({                 
        url:"https://api.github.com/repos/"+_config['owner']+"/"+_config['repo']+"/issues/"+_config['number']+"/comments",
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }
    });
}
```