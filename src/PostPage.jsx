import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';
import { useParams, Link } from 'react-router-dom';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className='editButton' type='button'>
                Edit Post
              </button>
            </Link>
            <button
              className='deleteButton'
              type='button'
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
