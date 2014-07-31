using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.DirectoryServices
{
    public class UserManager
    {
        string[] propertiestoLoad = new string[] { "SamAccountName", "givenName", "sn", "mail" };

        public ICollection<ADUser> GetAll(string domainName)
        {
            List<ADUser> users = new List<ADUser>();


            //string filter = "(&(objectCategory=organizationalPerson)(objectClass=User))";
            string filter = "(&(objectCategory=person)(objectClass=user)(!userAccountControl:1.2.840.113556.1.4.803:=2))";
            DirectorySearcher searcher = new DirectorySearcher(new DirectoryEntry("LDAP://" + domainName));
            searcher.PageSize = 10000;
            searcher.SizeLimit = 10000;
            searcher.SearchScope = SearchScope.Subtree;
            searcher.PropertiesToLoad.AddRange(propertiestoLoad);
            searcher.Filter = filter;
            SearchResultCollection RetObjects = searcher.FindAll();
            foreach (SearchResult result in RetObjects)
            {
                DirectoryEntry entry = result.GetDirectoryEntry();
                try
                {
                    users.Add(PopulateUserDetails(entry));
                }
                catch
                {
                }
            }

            return users;
        }

        private static ADUser PopulateUserDetails(DirectoryEntry entry)
        {
            return new ADUser
            {
                Username = entry.Properties["SamAccountName"][0].ToString(),
                Firstname = (entry.Properties["givenName"].Count > 0)
                            ? entry.Properties["givenName"][0].ToString()
                            : entry.Properties["SamAccountName"][0].ToString(),
                Lastname = (entry.Properties["sn"].Count > 0)
                            ? entry.Properties["sn"][0].ToString()
                            : string.Empty,
                Email = entry.Properties["mail"][0].ToString()
            };
        }

        public ADUser GetUserDetails(string domain, string username)
        {
            DirectoryEntry entry = new DirectoryEntry("LDAP://" + domain);
            DirectorySearcher adSearcher = new DirectorySearcher(entry);

            adSearcher.SearchScope = SearchScope.Subtree;
            adSearcher.PropertiesToLoad.AddRange(propertiestoLoad);
            adSearcher.Filter = "(&(objectClass=user)(samaccountname=" + username + "))";
            SearchResult userObject = adSearcher.FindOne();
            ADUser directoryUser = null;
            if (userObject != null)
            {
                try
                {
                    string[] props = new string[] { "givenName", "sn", "mail" };
                    directoryUser = new ADUser();
                    foreach (string prop in props)
                    {
                        switch (prop.ToLower())
                        {
                            case "givenname":
                                directoryUser.Firstname = userObject.Properties[prop][0].ToString();
                                break;
                            case "sn":
                                if (userObject.Properties[prop].Count > 0)
                                {
                                    directoryUser.Lastname = userObject.Properties[prop][0].ToString();
                                }
                                break;
                            case "mail":
                                if (userObject.Properties[prop].Count > 0)
                                {
                                    directoryUser.Email = userObject.Properties[prop][0].ToString();
                                }
                                break;
                        }
                        return directoryUser;
                    }
                }
                catch
                {
                    directoryUser = null;
                }
            }
            return directoryUser;
        }
    }
}
