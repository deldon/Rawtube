select * 
from rawtube_video
where user_id = 2
order by created_at 


select *
from rawtube_video
where user_id = 2
order by created_at 
offset 5 - 1
limit 1

select 
id,
url_thumbnail,
"views",
ROW_NUMBER() OVER(ORDER BY created_at) AS POSITION
from rawtube_video 
where user_id = 2

select * from rawtube_user ru 
select * from rawtube_video rv 
-- Seeding

INSERT INTO rawtube_user (name, email, password,url_thumbnail)
 VALUES 
('romain', 'r.deldon@gmail.com','1234','romain.jpg'),
('mark', 'mark@gmail.com','1234','mark.jpg');


INSERT INTO rawtube_video (url_file, is_encoded,url_thumbnail,"views",duration,user_id)
 VALUES 
 ('1.mp4', true,'1.jpg',54,156,1),
 ('2.mp4', true,'2.jpg',154,256,2),
 ('3.mp4', true,'3.jpg',4,16,1),
 ('4.mp4', true,'4.jpg',5,356,1),
 ('5.mp4', true,'5.jpg',554,86,1),
 ('6.mp4', false,'6.jpg',5454,786,2);

INSERT INTO rawtube_commentaries (user_id, video_id, comment)
 VALUES 
(1,1,'Cool'),
(1,2,'Yes'),
(2,2,'Best !!');

INSERT INTO rawtube_user_has_like  (user_id, video_id)
 VALUES 
(1,1),
(1,2),
(1,3),
(1,4),

(2,2),
(2,3),
(2,4),
(2,5);


-- getAllVideoByRelevance

select 
rawtube_video.id as video_id,
rawtube_video.url_file as url_file, 
rawtube_user.id as user_id,
rawtube_user.name as user_name,
rawtube_user.url_thumbnail as user_url_thumbnail,
	(select count(*) from rawtube_user_has_like
		where video_id = rawtube_video.id) as likes,
	(select count(*) from rawtube_commentaries
		where video_id = rawtube_video.id) as number_of_comments
from rawtube_video
join rawtube_user on rawtube_user.id = rawtube_video.user_id
where rawtube_video.is_encoded = true
order by rawtube_video.created_at desc
offset 4 - 1 -- 5 is param position
limit 1;

-- getAllVideoByUserById

select 
rawtube_video.id as video_id,
rawtube_video.url_file as url_file, 
rawtube_user.id as user_id,
rawtube_user.name as user_name,
rawtube_user.url_thumbnail as user_url_thumbnail,
	(select count(*) from rawtube_user_has_like
		where video_id = rawtube_video.id) as likes,
	(select count(*) from rawtube_commentaries
		where video_id = rawtube_video.id) as number_of_comments
from rawtube_video
join rawtube_user on rawtube_user.id = rawtube_video.user_id
where rawtube_user.id = 1                     -- 1 is param user id
order by rawtube_video.created_at desc
offset 4 - 1                                  -- 5 is param position
limit 1;

-- getAllVideoByUserId

select
rawtube_user.id,
rawtube_user.name,
rawtube_user.url_thumbnail,
	(select count(*) from rawtube_video
		where user_id = rawtube_user.id) as total_videos,
	(select count(*)
		from rawtube_user_has_like
		where user_id = rawtube_user.id) as total_likes
from rawtube_user
where id = 1;                                          -- user id


select 
id,
url_thumbnail,
"views",
ROW_NUMBER() OVER(ORDER BY created_at desc) AS POSITION
from rawtube_video 
where user_id = 1                                     -- user id
order by rawtube_video.created_at desc;

-- getAllVideoByUserShearch

select
id,
name
from rawtube_user
where name LIKE '%k%';

-- deleteVideoById

delete from rawtube_video 
where id = 1


-- update wiexs


update rawtube_video 
set views = (select "views" from rawtube_video where id = 2) + 1
where id = 2
returning *






