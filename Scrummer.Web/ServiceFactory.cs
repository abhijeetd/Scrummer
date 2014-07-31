using Scrummer.Application;
using Scrummer.Infrastructure.Mongo;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Scrummer.Web
{
    public class ServiceFactory
    {
        public static StandupService GetStandupService()
        {
            IMongoUnitOfWork uow = new ScrummerUnitOfWork();
            return new StandupService(new AgendaRepository(uow), new ActionItemRepository(uow), new IndividualStatusRepository(uow), new UserRepository(uow));
        }

        public static AccountService GetAccountService()
        {
            IMongoUnitOfWork uow = new ScrummerUnitOfWork();
            return new AccountService(new UserRepository(uow), new ProjectRepository(uow));
        }

    }
}