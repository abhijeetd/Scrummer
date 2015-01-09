using Scrummer.Application;
using Scrummer.Domain.Accounts;
using Scrummer.Domain.StandupAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scrummer.Web.API
{
    [RoutePrefix("api/scrum")]
    public class ScrumController : BaseApiController
    {
        StandupService scrumService;
        public ScrumController()
        {
            scrumService = ServiceFactory.GetStandupService();
        }

        #region Agendas
        [HttpGet]
        [Route("{id}/agendas")]
        public IHttpActionResult GetAgenda(DateTime id)
        {
            var list = scrumService.GetAgendas(new AgendaContext { Date = id }).ToList();
            return Ok<List<Agenda>>(list);
        }

        [HttpPost]
        [Route("{id}/agendas")]
        public IHttpActionResult AddAgenda(DateTime id, Agenda agenda)
        {
            var addedAgenda = scrumService.AddAgenda(agenda);
            return Ok<Agenda>(addedAgenda);
        }

        [HttpPut]
        [Route("{id}/agendas/{aid}/discussed")]
        public IHttpActionResult MarkAgendaAsDiscussed(DateTime id, string aid)
        {
            scrumService.MarkAgendaAsDiscussed(aid);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}/agendas/{aid}")]
        public IHttpActionResult DeleteAgenda(DateTime id, string aid)
        {
            scrumService.DeleteAgenda(aid);
            return Ok();
        }
        #endregion

        #region action items
        [HttpPut]
        [Route("{id}/actionitems/{aid}/completed")]
        public IHttpActionResult MarkActionItemAsCompleted(DateTime id, string aid)
        {
            scrumService.MarkActionItemAsCompleted(aid);
            return Ok();
        }


        [HttpGet]
        [Route("{id}/actionitems")]
        public List<ActionItem> GetActionItems(DateTime id)
        {
            var list = scrumService.GetActionItems(new ActionItemContext { Date = id }).ToList();
            return list;
        }

        [HttpPost]
        [Route("{id}/actionitems")]
        public IHttpActionResult AddActionItem(DateTime id, ActionItem item)
        {
            var addedAgenda = scrumService.AddActionItem(item);
            return Ok<ActionItem>(addedAgenda);
        }

        [HttpDelete]
        [Route("{id}/actionitems/{aid}")]
        public IHttpActionResult DeleteActionItem(DateTime id, string aid)
        {
            scrumService.DeleteActionItem(aid);
            return Ok();
        }

        [HttpGet]
        [Route("actionitemwise/{date}")]
        public List<ActionItem> GetMemberwiseHistory(DateTime? date)
        {
            var context = new ActionItemContext { Date = date };
            return scrumService.GetActionItems(context).ToList();
        }

        #endregion

        #region Individual status
        [HttpGet]
        [Route("{id}/individualstatus/{user}/{project}")]
        public List<IndividualStatus> GetTeamStatus(DateTime id, string user, string project)
        {
            var context = new IndividualStatusContext { Date = id, CurrentUser = user, Project = project };
            return scrumService.GetTeamStatus(context).ToList();
        }

        [HttpPut]
        [Route("{id}/individualstatus")]
        public IHttpActionResult UpdateIndividualStatus(DateTime id, IndividualStatus status)
        {
            var addedStatus = scrumService.UpdateIndividualStatus(status);
            return Ok<IndividualStatus>(addedStatus);
        }

        [HttpGet]
        [Route("{user}/memberwise")]
        public List<IndividualStatus> GetMemberwiseHistory(string user)
        {
            var context = new IndividualStatusContext { CurrentUser = user };
            return scrumService.GetMemberwiseHistory(context).ToList();
        }
        
        #endregion
    }
}
