using Connectors;
using Scrummer.Domain.Accounts;
using Scrummer.Domain.ProjectAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Application
{
    public class ProjectService
    {
        IUserRepository _userRepository;
        IProjectRepository _projectRepository;

        IMissionRepository _missionRepository;
        IActivityRepository _activityRepository;
        ISprintRepository _sprintRepository;
        ITeamMemberRepository _teamMemberRepository;

        public ProjectService(IUserRepository userRepository, IProjectRepository projectRepository, IMissionRepository missionRepository,
            IActivityRepository activityRepository, ISprintRepository sprintRepository, ITeamMemberRepository teamMemberRepository)
        {
            _userRepository = userRepository;
            _projectRepository = projectRepository;
            _missionRepository = missionRepository;
            _activityRepository = activityRepository;
            _sprintRepository = sprintRepository;
            _teamMemberRepository = teamMemberRepository;
        }

        #region Projects
        public IEnumerable<Project> GetProjects(ProjectFilter context)
        {
            var projects = _projectRepository.GetAll();
            if (context != null && string.IsNullOrEmpty(context.ProjectName) == false && string.Compare(context.ProjectName, "All projects", true) != 0)
            {
                projects = projects.Where((x) => x.Title.Contains(context.ProjectName));
            }
            return projects.OrderBy(p => p.Title);
        }

        public Project GetProject(string code)
        {
            return _projectRepository.GetFiltered(p => p.Code == code).Single();
        }

        public Project UpdateProject(Project project)
        {
            var record = _projectRepository.Get(project._id);
            if (record != null)
            {
                record.MergeWith<Project>(project);
                _projectRepository.Modify(record);
            }
            else
            {
                _projectRepository.Add(project);
                record = project;
            }
            return record;
        }

        public void DeleteProject(string pid)
        {
            _projectRepository.Remove(pid);
        }

        public void AssignProject(string userId, string project)
        {
            var user = _userRepository.Get(userId);
            user.Project = project;
            _userRepository.Modify(user);
        }
        #endregion

        #region Missions
        public Mission AddMission(Mission mission)
        {
            _missionRepository.Add(mission);
            return mission;
        }

        public Mission UpdateMission(Mission mission)
        {
            var record = _missionRepository.Get(mission._id);
            if (record == null)
                throw new Exception("Record not found");

            record.MergeWith<Mission>(mission);
            _missionRepository.Modify(record);

            return record;
        }

        public IEnumerable<Mission> GetMissions(MissionContext context)
        {
            return _missionRepository.GetFiltered(p => p.ProjectCode == context.ProjectCode);
        }

        public void DeleteMission(string aid)
        {
            _missionRepository.Remove(aid);
        }
        #endregion

        #region Activitys
        public Activity AddActivity(Activity activity)
        {
            _activityRepository.Add(activity);
            return activity;
        }

        public IEnumerable<Activity> GetActivitys(ActivityContext context)
        {
            return _activityRepository.GetFiltered(p => p.ProjectCode == context.ProjectCode);
        }

        public void DeleteActivity(string aid)
        {
            _activityRepository.Remove(aid);
        }
        #endregion

        #region Sprints
        public Sprint AddSprint(Sprint sprint)
        {
            _sprintRepository.Add(sprint);
            return sprint;
        }

        public Sprint UpdateSprint(Sprint sprint)
        {
            var record = _sprintRepository.Get(sprint._id);
            if (record == null)
                throw new Exception("Record not found");

            record.MergeWith<Sprint>(sprint);
            _sprintRepository.Modify(record);

            return record;
        }
        public IEnumerable<Sprint> GetSprints(SprintContext context)
        {
            return _sprintRepository.GetFiltered(p => p.ProjectCode == context.ProjectCode);
        }

        public void DeleteSprint(string aid)
        {
            _sprintRepository.Remove(aid);
        }
        #endregion

        #region TeamMembers
        public TeamMember AddTeamMember(TeamMember teamMember)
        {
            _teamMemberRepository.Add(teamMember);
            return teamMember;
        }

        public IEnumerable<TeamMember> GetTeamMembers(TeamMemberContext context)
        {
            return _teamMemberRepository.GetFiltered(p => p.ProjectCode == context.ProjectCode);
        }

        public void DeleteTeamMember(string aid)
        {
            _teamMemberRepository.Remove(aid);
        }
        public TeamMember UpdateTeamMember(TeamMember teammember)
        {
            var record = _teamMemberRepository.Get(teammember._id);
            if (record == null)
                throw new Exception("Record not found");

            record.MergeWith<TeamMember>(teammember);
            _teamMemberRepository.Modify(record);

            return record;
        }
        #endregion

    }
}
