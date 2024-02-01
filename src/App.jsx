import { useState } from "react";
import Center from "./components/Center";
import Header from "./components/Header";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div>
      {/* Header */}
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Area Central */}
      <Center />
    </div>
  );
}

export default App;
