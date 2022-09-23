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

-- getAllVideoByRelevance

select * 
from rawtube_video
where user_id = 2
order by created_at 



