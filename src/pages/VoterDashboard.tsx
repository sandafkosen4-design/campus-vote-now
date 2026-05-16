import { useState } from "react";
import { AppData, Candidate, Position, Voter } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, User, Info, Vote as VoteIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

interface VoterDashboardProps {
  data: AppData;
  voter: Voter;
  onVote: (candidateId: string, positionId: string) => void;
}

export const VoterDashboard = ({ data, voter, onVote }: VoterDashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>(data.positions[0]?.id || "");

  const handleVoteClick = (candidate: Candidate) => {
    if (voter.hasVoted.includes(candidate.positionId)) {
      toast.error("You have already cast your vote for this position.");
      return;
    }
    
    onVote(candidate.id, candidate.positionId);
    toast.success(`Your vote for ${candidate.name} has been recorded!`);
  };

  const currentPosition = data.positions.find(p => p.id === activeTab);
  const candidatesForPosition = data.candidates.filter(c => c.positionId === activeTab);
  const hasVotedForCurrent = voter.hasVoted.includes(activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{data.election.title}</h1>
          <p className="text-muted-foreground mt-1">Hello, {voter.name}. Exercise your democratic right.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            {voter.hasVoted.length} / {data.positions.length} Positions Voted
          </Badge>
        </div>
      </header>

      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {data.positions.map((pos) => (
          <Button
            key={pos.id}
            variant={activeTab === pos.id ? "default" : "outline"}
            className={`rounded-full px-6 transition-all shrink-0 ${
              activeTab === pos.id ? "shadow-md scale-105" : ""
            }`}
            onClick={() => setActiveTab(pos.id)}
          >
            {pos.title}
            {voter.hasVoted.includes(pos.id) && (
              <CheckCircle2 className="ml-2 w-4 h-4" />
            )}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {candidatesForPosition.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`h-full flex flex-col transition-all border-2 ${
                hasVotedForCurrent ? "opacity-75" : "hover:border-blue-500/50 hover:shadow-lg"
              }`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  {hasVotedForCurrent && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="bg-green-500 text-white p-3 rounded-full">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    {candidate.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {candidate.manifesto}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Info className="w-4 h-4" />
                        Manifesto
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{candidate.name}'s Manifesto</DialogTitle>
                        <DialogDescription>Running for {currentPosition?.title}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <img src={candidate.imageUrl} className="w-full h-48 object-cover rounded-lg" alt="" />
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {candidate.manifesto}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {!hasVotedForCurrent && (
                    <Button 
                      className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleVoteClick(candidate)}
                    >
                      <VoteIcon className="w-4 h-4" />
                      Cast Vote
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.positions.length === voter.hasVoted.length && (
        <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-center py-12">
          <CardContent className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Participation Complete!</h2>
            <p className="text-green-700 dark:text-green-400 max-w-md mx-auto">
              Thank you for casting your votes. Your contribution to our school's democracy is invaluable.
              Results will be announced after the election closes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};