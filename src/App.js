import "./App.css";
import QuestionForm from "./Components/QuestionForm";

function App() {
  const handleBrandClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="brand" onClick={handleBrandClick}>
        <h2 className="brand-name">Appture</h2>
      </div>
      <div className="App">
        <header className="App-header">
          <hr />
          <h2 className="form-heading">Dynamic Question Form</h2>
        </header>
        <main className="App-main">
          <div className="Card">
            <QuestionForm />
          </div>
        </main>
      </div>
      <footer className="App-footer">
        <p>&copy; 2023 Appture Technology Private Limited</p>
      </footer>
    </>
  );
}

export default App;
