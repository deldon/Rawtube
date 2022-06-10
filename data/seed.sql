INSERT INTO rawtube_user (name,email,password,description,avatar) VALUES
('romain','r.deldon@gmail.com','1234','romain deldon','romain.jpeg'),
('mark','mark@gmail.com','1234','hello','mark.jpeg');

INSERT INTO rawtube_video (url_file,title,description,url_thumbnail,public,duration,user_id) VALUES 
('chat.mp4','un chat','chat mignon','chat.jpg',true,30,1);

SELECT * FROM rawtube_user

SELECT * FROM rawtube_video

SELECT * FROM rawtube_commentaries

INSERT INTO rawtube_commentaries (user_id,video_id,comment) VALUES
(2,1,'cool'),
(1,1,'merci'),
(2,3,'yes')

SELECT 
rawtube_commentaries.*,
rawtube_user.*
FROM rawtube_commentaries
JOIN rawtube_user ON rawtube_user.id = rawtube_commentaries.user_id
WHERE rawtube_commentaries.video_id = 1


    
    SELECT 
    rawtube_video.id,
    rawtube_video.url_thumbnail,
    rawtube_video.duration,
    rawtube_video.title,
    rawtube_video.public,
    rawtube_video.release_date,
    rawtube_video.views,
    (SELECT COUNT(*) 
        FROM rawtube_commentaries
        WHERE rawtube_commentaries.video_id = rawtube_video.id) AS commentaries
    FROM rawtube_video
    WHERE rawtube_video.user_id = 1
    
    

