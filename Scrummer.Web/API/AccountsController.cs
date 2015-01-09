using Connectors;
using Scrummer.Application;
using Scrummer.Domain.Accounts;
using Scrummer.Domain.ProjectAgg;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Scrummer.Web.API
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        private AccountService accountService;
        private ProjectService projectService;

        public AccountsController()
        {
            accountService = ServiceFactory.GetAccountService();
            projectService = ServiceFactory.GetProjectService();
        }

        #region users
        [HttpPost]
        [Route("users")]
        public IHttpActionResult CreateUsers()
        {
            int totalUsersAdded = accountService.CreateActiveDirectoryUsers();
            return Ok<int>(totalUsersAdded);
        }

        [HttpGet]
        [Route("users")]
        public IHttpActionResult GetUsers([FromUri] UserContext context)
        {
            List<User> list = accountService.GetUsers(context).ToList();
            return Ok<List<User>>(list);
        }

        [HttpPost]
        [Route("users/{id}/assignproject/{project}")]
        public IHttpActionResult AssignProject(string id, string project)
        {
            projectService.AssignProject(id, project);
            return Ok();
        }
        #endregion

        #region projects
        [HttpGet]
        [Route("projects/{code}")]
        public Project GetProject(string code)
        {
            return projectService.GetProject(code);
        }
        [HttpGet]
        [Route("projects")]
        public List<Project> GetProjects([FromUri] ProjectFilter context)
        {
            var list = projectService.GetProjects(context).ToList();
            return list;
        }

        [HttpPost, HttpPut]
        [Route("projects")]
        public IHttpActionResult UpdateProject(Project project)
        {
            var addedProject = projectService.UpdateProject(project);
            return Ok<Project>(addedProject);
        }


        [HttpDelete]
        [Route("projects/{pid}")]
        public IHttpActionResult DeleteProject(string pid)
        {
            projectService.DeleteProject(pid);
            return Ok();
        }

        #endregion
    }
}
