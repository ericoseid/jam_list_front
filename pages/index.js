import CreateAccount from './CreateAccount.js';

function HomePage() {
  return (
    <div>
      <CreateAccount/>
      <style jsx global>{`
        body {
          background-color : Aquamarine;
        }
      `}</style>
    </div>);
}

export default HomePage;