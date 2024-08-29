import { useQuery, gql } from "@apollo/client";

const query = gql`
  query getTodosWithUsers {
    getTodos {
      id
      title
        user {
        id 
        name
      
      }
    }
  }
`;

function App() {

  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <table>
        <tbody>
          {data.getTodos.map((todo) => {
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
