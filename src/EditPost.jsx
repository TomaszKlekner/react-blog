import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';
import DataContext from './context/DataContext';

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'dd MMMM, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='editTitle'>Title:</label>
            <input
              id='editTitle'
              type='text'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='editBody'>Post:</label>
            <textarea
              id='editBody'
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button onClick={() => handleEdit(post.id)} type='submit'>
              Submit
            </button>
          </form>
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
    </main>
  );
};

export default EditPost;
