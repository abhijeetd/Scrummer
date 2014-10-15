using Scrummer.Application;
using Scrummer.Domain.Accounts;
using Scrummer.Domain.Standups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scrummer.Web.API
{
    [RoutePrefix("api/standups")]
    public class StandupsController : BaseApiController
    {
        StandupService standupService;
        public StandupsController()
        {
            standupService = ServiceFactory.GetStandupService();
        }

        #region Agendas
        [HttpGet]
        [Route("{id}/agendas")]
        public IHttpActionResult GetAgenda(DateTime id)
        {
            var list = standupService.GetAgendas(new AgendaContext { Date = id }).ToList();
            return Ok<List<Agenda>>(list);
        }

        [HttpPost]
        [Route("{id}/agendas")]
        public IHttpActionResult AddAgenda(DateTime id, Agenda agenda)
        {
            var addedAgenda = standupService.AddAgenda(agenda);
            return Ok<Agenda>(addedAgenda);
        }

        [HttpPut]
        [Route("{id}/agendas/{aid}/discussed")]
        public IHttpActionResult MarkAgendaAsDiscussed(DateTime id, string aid)
        {
            standupService.MarkAgendaAsDiscussed(aid);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}/agendas/{aid}")]
        public IHttpActionResult DeleteAgenda(DateTime id, string aid)
        {
            standupService.DeleteAgenda(aid);
            return Ok();
        }
        #endregion

        #region action items
        [HttpPut]
        [Route("{id}/actionitems/{aid}/completed")]
        public IHttpActionResult MarkActionItemAsCompleted(DateTime id, string aid)
        {
            standupService.MarkActionItemAsCompleted(aid);
            return Ok();
        }


        [HttpGet]
        [Route("{id}/actionitems")]
        public List<ActionItem> GetActionItems(DateTime id)
        {
            var list = standupService.GetActionItems(new ActionItemContext { Date = id }).ToList();
            return list;
        }

        [HttpPost]
        [Route("{id}/actionitems")]
        public IHttpActionResult AddActionItem(DateTime id, ActionItem item)
        {
            var addedAgenda = standupService.AddActionItem(item);
            return Ok<ActionItem>(addedAgenda);
        }

        [HttpDelete]
        [Route("{id}/actionitems/{aid}")]
        public IHttpActionResult DeleteActionItem(DateTime id, string aid)
        {
            standupService.DeleteActionItem(aid);
            return Ok();
        }

        [HttpGet]
        [Route("actionitemwise/{date}")]
        public List<ActionItem> GetMemberwiseHistory(DateTime? date)
        {
            var context = new ActionItemContext { Date = date };
            return standupService.GetActionItems(context).ToList();
        }

        #endregion

        #region Individual status
        [HttpGet]
        [Route("{id}/individualstatus/{user}/{project}")]
        public List<IndividualStatus> GetTeamStatus(DateTime id, string user, string project)
        {
            var context = new IndividualStatusContext { Date = id, CurrentUser = user, Project = project };
            return standupService.GetTeamStatus(context).ToList();
        }

        [HttpPut]
        [Route("{id}/individualstatus")]
        public IHttpActionResult UpdateIndividualStatus(DateTime id, IndividualStatus status)
        {
            var addedStatus = standupService.UpdateIndividualStatus(status);
            return Ok<IndividualStatus>(addedStatus);
        }

        [HttpGet]
        [Route("{user}/memberwise")]
        public List<IndividualStatus> GetMemberwiseHistory(string user)
        {
            var context = new IndividualStatusContext { CurrentUser = user };
            return standupService.GetMemberwiseHistory(context).ToList();
        }
        
        #endregion
    }
}
