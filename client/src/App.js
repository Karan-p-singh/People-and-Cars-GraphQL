import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import "antd/dist/antd.min.css";
import Home from "./components/containers/Home";
import Show from "./components/containers/Show";
import { Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:9001/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/people/:id'
          element={<Show />}
        />
      </Routes>
    </div>
  </ApolloProvider>
);

export default App;
