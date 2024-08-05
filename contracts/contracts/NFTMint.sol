// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheBigSad is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(address=>bool) private members; // All the addresses who own an NFT on this DApp
    mapping(address=>string) private memberToUri; // Store each NFT's URI

    constructor()
        ERC721("TheBigSad", "SAD")
        Ownable(msg.sender)
    {}
 //this function addMember will add the members who own an NFT
    function addMember(address _to, string memory _tokenURI) internal{
        require(!members[_to], "This member already owns an NFT");
        members[_to]= true;
        memberToUri[_to] = _tokenURI;
    }
    function getAllMembers() public view returns (address[] memory){
        // 1. iterate over each NFT
        // 2. For each NFT, fetch the owner
        // 3. create an array of all owners and return the array
        address[] memory _members = new address[](_nextTokenId);
        for(uint i=0;i<_nextTokenId;i++){
            _members[i] = ownerOf(i);
        }
        return _members;
    }
    function getAllURIs() public view returns (string[] memory){
       
        string[] memory uris = new string[](_nextTokenId);
        for(uint i=0;i<_nextTokenId;i++){
            uris[i] = tokenURI(i);
        }
        return uris;
    }
    function getUserURI(address userAddress) public view returns (string memory){
        return memberToUri[userAddress];
    }
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        addMember(to,uri);
    }
   
    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
