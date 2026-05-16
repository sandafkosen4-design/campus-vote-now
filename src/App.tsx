import { useState, useEffect } from "react";
import { AppData, Voter } from "./types";
import { loadData, saveData } from "./lib/storage";
import { Login } from "./pages/Login";
import { VoterDashboard } from "./pages/VoterDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Toaster, toast } from "sonner";
import { LogOut, LayoutDashboard, UserCircle, Vote as VoteIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

function App() {
  const [data, setData] = useState<AppData>(loadData());
  const [currentUser, setCurrentUser] = useState<Voter | null>(null);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const handleLogin = (voter: Voter) => {
    setCurrentUser(voter);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  const handleVote = (candidateId: string, positionId: string) => {
    if (!currentUser) return;

    const newData = { ...data };
    
    // Increment candidate votes
    newData.candidates = newData.candidates.map(c => 
      c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
    );

    // Mark voter as voted for this position
    newData.voters = newData.voters.map(v => 
      v.id === currentUser.id 
        ? { ...v, hasVoted: [...v.hasVoted, positionId] } 
        : v
    );

    setData(newData);
    
    // Update local user state too
    setCurrentUser({
      ...currentUser,
      hasVoted: [...currentUser.hasVoted, positionId]
    });
  };

  const handleUpdateData = (newData: AppData) => {
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 text-foreground selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" richColors />
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 dark:shadow-none shadow-lg">
              <VoteIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">SUG Vote</span>
              <span className="font-bold text-lg sm:hidden">SUG</span>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 mr-2">
                <div className="text-right">
                  <p className="text-sm font-semibold leading-none">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{currentUser.role}</p>
                </div>
                <UserCircle className="w-8 h-8 text-slate-400" />
              </div>
              
              {currentUser.role === 'admin' && (
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Admin
                </Badge>
              )}

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {!currentUser ? (
          <Login data={data} onLogin={handleLogin} />
        ) : currentUser.role === "admin" ? (
          <AdminDashboard data={data} onUpdate={handleUpdateData} />
        ) : (
          <VoterDashboard data={data} voter={currentUser} onVote={handleVote} />
        )}
      </main>

      <footer className="border-t bg-white dark:bg-slate-900 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a4bc0e00-8af0-4b19-b969-5ffe6d824c1f/sug-logo-6ec53bf3-1778931060317.webp" 
                className="w-12 h-12 rounded-lg object-cover grayscale opacity-60"
                alt="School Logo" 
              />
              <div>
                <p className="text-sm font-bold text-muted-foreground">Student Union Government</p>
                <p className="text-xs text-muted-foreground/60">© 2024 Secure Voting Initiative</p>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Election Rules</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;