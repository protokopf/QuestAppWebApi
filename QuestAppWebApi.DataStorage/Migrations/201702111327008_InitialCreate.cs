namespace QuestAppWebApi.DataStorage.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Quests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(nullable: false),
                        Title = c.String(),
                        Description = c.String(),
                        Deadline = c.DateTime(nullable: false),
                        CurrentState = c.Int(nullable: false),
                        IsImportant = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Quests");
        }
    }
}
