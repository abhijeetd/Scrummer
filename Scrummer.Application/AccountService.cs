using Connectors;
using Scrummer.DirectoryServices;
using Scrummer.Domain.Accounts;
using Scrummer.Domain.ProjectAgg;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;

namespace Scrummer.Application
{
    public class AccountService
    {
        IUserRepository _userRepository;
        public AccountService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
                users = users.Where((p) => p.Username.Contains(userContext.Username));
            }
            return users.OrderBy(p => p.Firstname).ThenBy(p => p.Lastname);
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
