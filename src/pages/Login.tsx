import React, { useState } from "react";
import { AppData, Voter } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { ShieldCheck, User, LogIn } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  data: AppData;
  onLogin: (voter: Voter) => void;
}

export const Login = ({ data, onLogin }: LoginProps) => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      const voter = data.voters.find(v => v.studentId.toUpperCase() === studentId.toUpperCase());
      
      if (voter) {
        // In a real app, we'd check password. Here any password works for demo.
        onLogin(voter);
        toast.success(`Welcome back, ${voter.name}`);
      } else {
        toast.error("Invalid Student ID. Please check and try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md mx-4 overflow-hidden border-none shadow-2xl bg-card/50 backdrop-blur-md">
        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">SUG Voting Portal</CardTitle>
          <CardDescription>
            Enter your student credentials to participate in the election.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID / Admin ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="studentId"
                  placeholder="e.g. STU001 or ADMIN123"
                  className="pl-10 h-12"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Access Portal
                </span>
              )}
            </Button>
          </form>
          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground border border-border/50">
            <p className="font-semibold mb-1 uppercase tracking-wider">Demo Access:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Voter ID: <code className="bg-background px-1 rounded">STU001</code></li>
              <li>Admin ID: <code className="bg-background px-1 rounded">ADMIN123</code></li>
              <li>Password: Any text</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};