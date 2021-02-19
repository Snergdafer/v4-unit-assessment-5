DELETE FROM helo_posts
WHERE post_id = $1
RETURNING *;