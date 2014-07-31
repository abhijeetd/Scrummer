using Scrummer.DirectoryServices;
using Scrummer.Domain.Accounts;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Application
{
    public class AccountService
    {
        IUserRepository _userRepository;
        IProjectRepository _projectRepository;
        public AccountService(IUserRepository userRepository, IProjectRepository projectRepository)
        {
            _userRepository = userRepository;
            _projectRepository = projectRepository;
        }

        public int CreateActiveDirectoryUsers()
        {
            int counter = 0;
            var domainName = ConfigurationManager.AppSettings["domain"];
            try
            {
                UserManager manager = new UserManager();
                var users = manager.GetAll(domainName);
                foreach (Scrummer.DirectoryServices.ADUser user in users)
                {
                    if (_userRepository.GetFiltered(p => p.Username == user.Username).Any() == false)
                    {
                        _userRepository.Add(new Scrummer.Domain.Accounts.User
                        {
                            Username = user.Username,
                            Firstname = user.Firstname,
                            Lastname = user.Lastname,
                            Email = user.Email,
                            IsActive = true
                        });
                        counter++;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return counter;
        }

        public IEnumerable<User> GetUsers(UserContext userContext)
        {
            var users = _userRepository.GetFiltered(p => p.IsActive == true);
            if (userContext != null && string.IsNullOrEmpty(userContext.Project) == false && string.Compare(userContext.Project, "All projects", true) != 0)
            {
                users = users.Where((x) => x.Project == userContext.Project);
            }
            if (userContext != null && string.IsNullOrEmpty(userContext.Username) == false)
            {
                users = users.Where((p) => p.Username == userContext.Username);
            }
            return users.OrderBy(p => p.Firstname).ThenBy(p => p.Lastname);
        }

        public IEnumerable<Project> GetProjects(ProjectContext projectContext)
        {
            return _projectRepository.GetAll();
        }

        public Project AddProject(Project project)
        {
            _projectRepository.Add(project);
            return project;
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

        public User AddUser(User profile)
        {
            _userRepository.Add(profile);
            return profile;
        }

        public User ValidateAndPopulateProfile(User profile)
        {
            return _userRepository.GetFiltered(p => p.Username == profile.Username).SingleOrDefault();
        }
    }
}
