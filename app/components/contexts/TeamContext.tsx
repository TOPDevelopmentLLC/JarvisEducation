import { Team } from "lib/models/team";
import { mockTeamData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface TeamContextType {
  teams: Team[];
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (teamId: string) => void;
  addMemberToTeam: (teamId: string, memberId: string) => void;
  removeMemberFromTeam: (teamId: string, memberId: string) => void;
  assignCodesToTeam: (teamId: string, codeIds: string[]) => void;
  unassignCodeFromTeam: (teamId: string, codeId: string) => void;
}

const TeamContext = createContext<TeamContextType|undefined>(undefined);

export const TeamProvider = ({ children }: {children:ReactNode}) => {
  const [teams, setTeams] = useState<Team[]>(mockTeamData);
  const [selectedTeam, setSelectedTeam] = useState<Team|null>(null);

  const addTeam = (team: Team) => {
    setTeams(prev => [...prev, team]);
  };

  const updateTeam = (team: Team) => {
    setTeams(prev => prev.map(t => t.teamId === team.teamId ? team : t));
    if (selectedTeam?.teamId === team.teamId) {
      setSelectedTeam(team);
    }
  };

  const deleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(t => t.teamId !== teamId));
  };

  const addMemberToTeam = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(team => {
      if (team.teamId === teamId) {
        const currentMembers = team.memberIds || [];
        if (!currentMembers.includes(memberId)) {
          return { ...team, memberIds: [...currentMembers, memberId] };
        }
      }
      return team;
    }));

    if (selectedTeam?.teamId === teamId) {
      const currentMembers = selectedTeam.memberIds || [];
      if (!currentMembers.includes(memberId)) {
        setSelectedTeam({
          ...selectedTeam,
          memberIds: [...currentMembers, memberId]
        });
      }
    }
  };

  const removeMemberFromTeam = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(team => {
      if (team.teamId === teamId) {
        return {
          ...team,
          memberIds: team.memberIds.filter(id => id !== memberId)
        };
      }
      return team;
    }));

    if (selectedTeam?.teamId === teamId) {
      setSelectedTeam({
        ...selectedTeam,
        memberIds: selectedTeam.memberIds.filter(id => id !== memberId)
      });
    }
  };

  const assignCodesToTeam = (teamId: string, codeIds: string[]) => {
    setTeams(prev => prev.map(team => {
      if (team.teamId === teamId) {
        return { ...team, assignedCodeIds: codeIds };
      }
      return team;
    }));

    if (selectedTeam?.teamId === teamId) {
      setSelectedTeam({
        ...selectedTeam,
        assignedCodeIds: codeIds
      });
    }
  };

  const unassignCodeFromTeam = (teamId: string, codeId: string) => {
    setTeams(prev => prev.map(team => {
      if (team.teamId === teamId) {
        return {
          ...team,
          assignedCodeIds: team.assignedCodeIds.filter(id => id !== codeId)
        };
      }
      return team;
    }));

    if (selectedTeam?.teamId === teamId) {
      setSelectedTeam({
        ...selectedTeam,
        assignedCodeIds: selectedTeam.assignedCodeIds.filter(id => id !== codeId)
      });
    }
  };

  return (
    <TeamContext.Provider value={{
      teams,
      selectedTeam,
      setSelectedTeam,
      addTeam,
      updateTeam,
      deleteTeam,
      addMemberToTeam,
      removeMemberFromTeam,
      assignCodesToTeam,
      unassignCodeFromTeam
    }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useStoredTeamData = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useStoredTeamData must be used within a TeamProvider');
  }
  return context;
}
