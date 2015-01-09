using Connectors;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.VersionControl.Client;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using System;
using System.Diagnostics;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace TFSServices
{
    public class ProjectService
    {
        private TfsTeamProjectCollection projectCollection;

        public ProjectFilter Context { get; private set; }
        public ProjectService(ProjectFilter context)
        {
            Context = context;
        }

        public Dictionary<int, string> GetIterations()
        {
            var iterations = new Dictionary<int, string>();

            foreach (Node iteration in GetIterationNodes())
            {
                iterations.Add(iteration.Id, iteration.Name);
            }

            return iterations;
        }

        //public Dictionary<int, string> GetSprintsByIterationName(SprintFilter context)
        //{
        //    Dictionary<int, string> sprints = new Dictionary<int, string>();
        //    foreach (Node sprint in GetIterationNodes()[context.IterationName])
        //    {
        //        sprints.Add(sprint.Id, sprint.Name);
        //    }
        //    return sprints;
        //}

        private NodeCollection GetIterationNodes()
        {
            return GetProjectDetailsByName(Context.ProjectName).IterationRootNodes;
        }
        private void GetWorkItemTypes()
        {
            var list = GetProjectDetailsByName(Context.ProjectName).WorkItemTypes;

            //Task
            //Bug
            //Impediment
            //Product Backlog Item
            //Shared Steps
            //Sprint
            //Test Case
            //Code Review Request
            //Code Review Response
            //Feedback Request
            //Feedback Response
            //Feature
            //Shared Parameter
        }
        private TfsTeamProjectCollection Connect()
        {
            if (projectCollection == null)
            {
                var token = new Microsoft.TeamFoundation.Client.SimpleWebTokenCredential(Context.Username, Context.Password);
                var clientCreds = new Microsoft.TeamFoundation.Client.TfsClientCredentials(token);
                projectCollection = new TfsTeamProjectCollection(new Uri(Context.ConnectionString), clientCreds);
                projectCollection.EnsureAuthenticated();
                projectCollection.Connect(Microsoft.TeamFoundation.Framework.Common.ConnectOptions.None);


                //Uri collectionUri = new Uri(Context.ConnectionString);

                //NetworkCredential credential = new NetworkCredential(Context.Username, Context.Password);
                //projectCollection = new TfsTeamProjectCollection(collectionUri, credential);
                //projectCollection.EnsureAuthenticated();
            }
            return projectCollection;
        }
        private Project GetProjectDetailsByName(string projectName)
        {
            var wiStore = Connect().GetService<WorkItemStore>();
            return wiStore.Projects[projectName];
        }
    }
}
