using Scrummer.Application;
using Scrummer.Domain.ProjectAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scrummer.Web.API
{
    [RoutePrefix("api/projects")]
    public class ProjectsController : BaseApiController
    {
        ProjectService projectService;
        public ProjectsController()
        {
            projectService = ServiceFactory.GetProjectService();
        }

        #region Missions
        [HttpGet]
        [Route("{id}/missions")]
        public IHttpActionResult GetMission(string id)
        {
            var list = projectService.GetMissions(new MissionContext { ProjectCode = id }).ToList();
            return Ok<List<Mission>>(list);
        }

        [HttpPost]
        [Route("{id}/missions")]
        public IHttpActionResult AddMission(string id, Mission mission)
        {
            var addedMission = projectService.AddMission(mission);
            return Ok<Mission>(addedMission);
        }

        [HttpPut]
        [Route("{id}/missions")]
        public IHttpActionResult UpdateMission(string id, Mission mission)
        {
            if (id != mission.ProjectCode)
                throw new Exception("projectcode does not match");

            var addedMission = projectService.UpdateMission(mission);
            return Ok<Mission>(addedMission);
        }

        [HttpDelete]
        [Route("{id}/missions/{mid}")]
        public IHttpActionResult DeleteMission(DateTime id, string mid)
        {
            projectService.DeleteMission(mid);
            return Ok();
        }
        #endregion

        #region Team members
        [HttpGet]
        [Route("{id}/teammembers")]
        public IHttpActionResult GetTeamMember(string id)
        {
            var list = projectService.GetTeamMembers(new TeamMemberContext { ProjectCode = id }).ToList();
            return Ok<List<TeamMember>>(list);
        }

        [HttpPost]
        [Route("{id}/teammembers")]
        public IHttpActionResult AddTeamMember(string id, TeamMember teammember)
        {
            var addedTeamMember = projectService.AddTeamMember(teammember);
            return Ok<TeamMember>(addedTeamMember);
        }

        [HttpPut]
        [Route("{id}/teammembers")]
        public IHttpActionResult UpdateTeamMember(string id, TeamMember teammember)
        {
            var addedTeamMember = projectService.UpdateTeamMember(teammember);
            return Ok<TeamMember>(addedTeamMember);
        }

        [HttpDelete]
        [Route("{id}/teammembers/{tmid}")]
        public IHttpActionResult DeleteTeamMember(DateTime id, string tmid)
        {
            projectService.DeleteTeamMember(tmid);
            return Ok();
        }
        #endregion

        #region Sprints
        [HttpGet]
        [Route("{id}/sprints")]
        public IHttpActionResult GetSprint(string id)
        {
            var list = projectService.GetSprints(new SprintContext { ProjectCode = id }).ToList();
            return Ok<List<Sprint>>(list);
        }

        [HttpPost]
        [Route("{id}/sprints")]
        public IHttpActionResult AddSprint(string id, Sprint sprint)
        {
            var addedSprint = projectService.AddSprint(sprint);
            return Ok<Sprint>(addedSprint);
        }

        [HttpPut]
        [Route("{id}/sprints")]
        public IHttpActionResult UpdateSprint(string id, Sprint sprint)
        {
            var addedSprint = projectService.UpdateSprint(sprint);
            return Ok<Sprint>(addedSprint);
        }

        [HttpDelete]
        [Route("{id}/sprints/{tmid}")]
        public IHttpActionResult DeleteSprint(string id, string tmid)
        {
            projectService.DeleteSprint(tmid);
            return Ok();
        }
        #endregion

    }
}
