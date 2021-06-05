import HomeContainer from "../HomeContainer";
import '../assets/HomePage.css';

function HomePage(props) {
  return (
    <div className="p-2 bg-gray-200 bg-opacity-75 mb-2 mx-48 rounded border-2">
      <h1 className="">{global.searchable && <div></div>}</h1>
      <HomeContainer />
    </div>
  );
}

export default HomePage;
