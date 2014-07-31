using Scrummer.Application;
using Scrummer.Domain.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scrummer.Web.API
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        private AccountService accountService;

        public AccountsController()
        {
            accountService = ServiceFactory.GetAccountService();
        }

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
            accountService.AssignProject(id, project);
            return Ok();
        }

        #region projects
        [HttpGet]
        [Route("projects")]
        public List<Project> GetProjects()
        {
            var list = accountService.GetProjects(new ProjectContext()).ToList();
            return list;
        }

        [HttpPost]
        [Route("projects")]
        public IHttpActionResult AddProject(Project project)
        {
            var addedProject = accountService.AddProject(project);
            return Ok<Project>(addedProject);
        }


        [HttpDelete]
        [Route("projects/{pid}")]
        public IHttpActionResult DeleteProject(string pid)
        {
            accountService.DeleteProject(pid);
            return Ok();
        }
        #endregion
    }
}
