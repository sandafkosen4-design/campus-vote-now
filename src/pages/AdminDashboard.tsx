import { useState } from "react";
import { AppData, Candidate, Position } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ElectionStats } from "../components/ElectionStats";
import { Plus, Trash2, Edit2, Users, FileText, BarChart3, Settings } from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  data: AppData;
  onUpdate: (data: AppData) => void;
}

export const AdminDashboard = ({ data, onUpdate }: AdminDashboardProps) => {
  const [newPosTitle, setNewPosTitle] = useState("");

  const addPosition = () => {
    if (!newPosTitle) return;
    const newPos: Position = {
      id: "p" + Math.random().toString(36).substr(2, 9),
      title: newPosTitle,
    };
    onUpdate({
      ...data,
      positions: [...data.positions, newPos],
    });
    setNewPosTitle("");
    toast.success("Position added successfully");
  };

  const deletePosition = (id: string) => {
    onUpdate({
      ...data,
      positions: data.positions.filter((p) => p.id !== id),
      candidates: data.candidates.filter((c) => c.positionId !== id),
    });
    toast.info("Position and associated candidates removed");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel</h1>
        <p className="text-muted-foreground mt-1">Manage election lifecycle, positions, and real-time results.</p>
      </header>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="results" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="positions" className="gap-2">
            <FileText className="w-4 h-4" />
            Positions
          </TabsTrigger>
          <TabsTrigger value="candidates" className="gap-2">
            <Users className="w-4 h-4" />
            Candidates
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.positions.map((pos) => (
              <ElectionStats key={pos.id} data={data} positionId={pos.id} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle>Manage Voting Positions</CardTitle>
              <CardDescription>Define the roles students are voting for.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="New Position Title (e.g. Welfare Director)" 
                  value={newPosTitle}
                  onChange={(e) => setNewPosTitle(e.target.value)}
                />
                <Button onClick={addPosition} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
              <div className="divide-y divide-border border rounded-lg">
                {data.positions.map((pos) => (
                  <div key={pos.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <span className="font-medium">{pos.title}</span>
                    <Button variant="ghost" size="icon" onClick={() => deletePosition(pos.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.candidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden">
                <div className="h-32 bg-muted relative">
                  <img src={candidate.imageUrl} className="w-full h-full object-cover" alt="" />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button size="icon" variant="secondary" className="h-8 w-8"><Edit2 className="w-3.5 h-3.5" /></Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{candidate.name}</CardTitle>
                  <CardDescription>
                    {data.positions.find(p => p.id === candidate.positionId)?.title}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
            <Card className="border-dashed flex flex-col items-center justify-center p-8 hover:bg-muted/50 cursor-pointer transition-colors text-muted-foreground">
              <Plus className="w-12 h-12 mb-2 opacity-20" />
              <p className="font-medium">Add Candidate</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Election Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Election Title</Label>
                  <Input defaultValue={data.election.title} />
                </div>
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Input type="datetime-local" defaultValue={data.election.startDate.substring(0, 16)} />
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Input type="datetime-local" defaultValue={data.election.endDate.substring(0, 16)} />
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => {
                  if(confirm("Are you sure you want to reset all data?")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}>
                  Reset All Data
                </Button>
                <Button onClick={() => toast.success("Configuration saved!")}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};