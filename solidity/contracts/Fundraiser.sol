contract Fundraiser {
    address owner;
    address[] public contributors;
    mapping(address => uint) public contributionAmount
    string public name;
    string public description;
    uint public minimumContribution;
    uint public fundingGoal;
    
    constructor(string _name, string _description, uint _minimumContribution, uint _fundingGoal) {
        owner = msg.sender;
        name = _name;
        description = _description;
        minimumContribution = _minimumContribution;
        fundingGoal = _fundingGoal;
    }
    
    function getContributionBalance() external view returns(uint) {
        return (address(this)).balance;
    }
    
    function contribute() external payable {
        uint currentBalance = this.getContributionBalance();
        require(msg.value >= minimumContribution);
        contributors.push(msg.sender);
        contributionAmount[msg.sender] = msg.value;
        
        if((currentBalance + msg.value) >= fundingGoal) {
            address(uint160(owner)).transfer(this.getContributionBalance());
        }
    }
}
