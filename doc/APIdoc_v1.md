# rowtok router

Tags: en cours

![Sans-titre-2022-09-21-1500.png](rowtok%20router%2058179441bae74c139fbda48a128d0fb4/Sans-titre-2022-09-21-1500.png)

[rowTokV2.excalidraw](rowtok%20router%2058179441bae74c139fbda48a128d0fb4/rowTokV2.excalidraw)

[https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)

# Home

## getAllVideoByRelevance

### GET /video/:position/

### Response

```json
	
	{
			"video_id": 1,
			"url_file": "http://apiurl.com/video?v=16aab56b-a287-4ccf-9e33-15e1a9151487.webm",
			"user_id": 2,
			"user_name": "romain",
			"user_url_thumbnail": "http://apiurl.com/userThumbnail/hhih.jpeg",
			"likes": 20,
			"number_of_comments": 25,
	}
```

```html
<video id="videoPlayer" width="750" controls >
    <source id="videoSource" src="/video?v={{ data.url_file }}" type="video/webm" />
</video>
```

"user_is_creative": false ???
"user_is_liked": false, ???

## getAllVideoByUserById

### GET /video/:position/:userId

### Response

```json
	{
			"video_id": 1,
			"url_file": "http://apiurl.com/video?v=16aab56b-a287-4ccf-9e33-15e1a9151487.webm",
			"user_id": 2,
			"user_name": "romain",
			"user_url_thumbnail": "http://apiurl.com/userThumbnail/hhih.jpeg",
			"likes": 20,
			"number_of_comments": 25,
	}
```

```html
<video id="videoPlayer" width="750" controls >
    <source id="videoSource" src="/video?v={{ data.url_file }}" type="video/webm" />
</video>
```

## postVideoLikeById

### POST /like/add/:id —- Token

> If the video is not liked, we like it and if the video is already liked, we dislike it
> 

### Params

id : Video id

### Response 200

```json
{
	"liked": true,
	"newLikeNumber": 26
}
```

## deleteVideoById

### DELETE /video/:id —- Token

### Params

id : Video id

### Response 200

```json
{
	"Video_id":54,
	"Video_deleted": true
}
```

# Channel

## getAllVideoByUserId

### GET /video/user/:id

### Params

id : user id

### Response

```json
{
	"user":
			{
					"id": 2,
					"name": "romain",
					"url_thumbnail": "http://apiurl.com/userThumbnail/hhih.jpeg",
					"total_videos": 250,
					"total_likes": 5652
			}
	"videos":
			[
					{
							"id": 1,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 10,
							"position": 1
					},
					{
							"id": 2,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 100,
							"position": 2
					},
					{
							"id": 56,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 510,
							"position": 3
					},
			]
}
```

```sql
select 
id,
url_thumbnail,
"views",
ROW_NUMBER() OVER(ORDER BY created_at) AS POSITION
from rawtube_video 
where user_id = 2
```

## getAllVideoByUserSearch

### GET /video/user/?q=@romain

### Response

```json
{
	"user":
			{
					"id": 2,
					"name": "romain",
					"avatar": "http://apiurl.com/userThumbnail/hhih.jpeg",
					"total_videos": 250,
					"total_likes": 5652
			}
	"videos":
			[
					{
							"id": 1,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 10,
							"position": 1
					},
					{
							"id": 2,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 100,
							"position": 2
					},
					{
							"id": 56,
							"url_thumbnail": "http://apiurl.com/thumbnail/16aab56b-a287-4ccf-9e33-15e1a9151487.jpg",
							"views": 510,
							"position": 3
					},
			]
}
```

# Comment

## getAllCommentByVideoId

### GET /comment/:videoId

### Params

id : Video id

### Response 200

```json
{
	"comment_number": 687,
	"comment": 
	[
		{
				"user_id": 2,
				"user_name": "romain",
				"user_avatar": "http://apiurl.com/userThumbnail/hhih.jpeg",
				"comment_id": 66,
				"comment_text": "Bla bla bla ....",
				"reated_at:":"5m"
		},
		{
				"user_id": 2,
				"user_name": "romain",
				"user_avatar": "http://apiurl.com/userThumbnail/hhih.jpeg",
				"comment_id": 87,
				"comment_text": "Bla bla bla ....",
				"reated_at:":"5m"
		},
	]
}
```

## postCommentByVideoId

### POST /comment/:videoId   —- Token

### Params

id : Video id

### Body

```sql
{
	"comment_text":"Bli Bla Blou...."
}
```

### Response 200

```json

		{
				"user_id": 2,
				"user_name": "romain",
				"user_avatar": "http://apiurl.com/userThumbnail/hhih.jpeg",
				"comment_id": 67,
				"comment_text": "Bli Bla Blou....",
				"reated_at:":"2s"
		}
```

# Edit user

## GetMyUser

### GET /user/   —- Token

### Response 200

```json

		{
				"user_id": 2,
				"user_name": "romain",
				"user_avatar": "http://apiurl.com/userThumbnail/hhih.jpeg",
				"user_email":"romain@gmail.com"
		}
```

## UpdateMyUser

### UPDATE /user/   —- Token

### Request

```json
{
				"user_name": "romain",
				"user_email":"romain@gmail.com"
}
```

### Response 200

```json
{
				"user_id": 2,
				"user_name": "romain",
				"user_email":"romain@gmail.com"
}
```

## UpdateMyThumbnail

### UPDATE /user/thumbnail   —- Token

### Response 200

```json
{
		"user_id": 2,
		"user_avatar": "http://apiurl.com/userThumbnail/hhih.jpeg"
}
```

## UpdateMyPassword

### UPDAT /user/password   —- Token

### Request

```sql
{
	"old_password":"1234",
	"new_password":"ezJ(84@"
}
```

### Response 200

```json

{
		"password_changed":true
}
```

# Login

## postlogin

### POST /user/login

### Body

```json
{
	"email":"romain@gmail.com",
	"password":"1234"
}
```

### Response 200

```json
{
	"logged":true,
	"user_id": 2,
}
```

# Register

## postRegister

### POST /user/register

### Body

```json
{
	"user_name": "romain",
	"email":"romain@gmail.com",
	"password":"1234",
	"confirm_password":"1234",
}
```

### Response 200

```json
{
	"register":true,
}
```

# Upload

## postUpload

### POST /upload/ —- token

### Response 200

```json
{
	"upload":true,
}
```

# Stream

## getStream

### GET /stream/

