import AddPostForm from './components/posts/AddPostForm';
import PostsList from './components/posts/PostsList';

const App = () => {
  return (
    <main className='App'>
      <AddPostForm />
      <PostsList />
    </main>
  );
};

export default App;
