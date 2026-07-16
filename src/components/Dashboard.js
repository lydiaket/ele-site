import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <main>
      <h1>ELE Admin Portal</h1>

      <nav>
        <ul>
          <li>Program Years</li>
          <li>Current Year (26–27)</li>
          <li>Matching Tool</li>
        </ul>
      </nav>

      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Dashboard;