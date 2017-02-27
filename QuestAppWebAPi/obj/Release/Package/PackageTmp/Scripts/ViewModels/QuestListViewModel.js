$(document).ready(function () {

    function QuestListViewModel()
    {
        var self = this;

        self.FormCurrentState = function (stateNumber) {
            var stateString = "";
            switch(stateNumber) {
                case 0:
                    stateString = "Idle";
                    break;
                case 1:
                    stateString = "Progress";
                    break;
                case 2:
                    stateString = "Done";
                    break;
                case 3:
                    stateString = "Failed";
                    break;
                default:
                    stateString = "Undefined";
            }
            return stateString;
        }

        self.QuestList = ko.observableArray([]);

        self.GetQuestList = function () {
            $.ajax({
                type: "GET",
                url: "/api/Quests",
                dataType: "json",
                success: function (data) {
                    self.QuestList(data);
                }
            });
        }

        self.DeleteQuest = function (quest) {
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "/api/Quests/" + quest.Id,
                success: function (data) {
                    self.QuestList.remove(function (q) {
                        return q.Id === quest.Id;
                    });
                }
            });
        }
    }

    var ViewModel = new QuestListViewModel();

    ViewModel.GetQuestList();

    ko.applyBindings(ViewModel);

});