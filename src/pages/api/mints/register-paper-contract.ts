import { NextApiRequest, NextApiResponse } from "next"
import Strapi from "strapi-sdk-js"

export async function getContractABI() {
  return [
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: "address", name: "facetAddress", type: "address" },
            {
              internalType: "enum IDiamondCut.FacetCutAction",
              name: "action",
              type: "uint8",
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          indexed: false,
          internalType: "struct IDiamondCut.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_init",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_calldata",
          type: "bytes",
        },
      ],
      name: "DiamondCut",
      type: "event",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "facetAddress", type: "address" },
            {
              internalType: "enum IDiamondCut.FacetCutAction",
              name: "action",
              type: "uint8",
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          internalType: "struct IDiamondCut.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]",
        },
        { internalType: "address", name: "_init", type: "address" },
        { internalType: "bytes", name: "_calldata", type: "bytes" },
      ],
      name: "diamondCut",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes4", name: "_functionSelector", type: "bytes4" },
      ],
      name: "facetAddress",
      outputs: [
        { internalType: "address", name: "facetAddress_", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "facetAddresses",
      outputs: [
        {
          internalType: "address[]",
          name: "facetAddresses_",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_facet", type: "address" }],
      name: "facetFunctionSelectors",
      outputs: [
        {
          internalType: "bytes4[]",
          name: "facetFunctionSelectors_",
          type: "bytes4[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "facets",
      outputs: [
        {
          components: [
            { internalType: "address", name: "facetAddress", type: "address" },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          internalType: "struct IDiamondLoupe.Facet[]",
          name: "facets_",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
      name: "gasCacheForSelector",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_operator", type: "address" }],
      name: "grantOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "immutableUntilBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "diamondSawAddress", type: "address" },
        {
          internalType: "address[]",
          name: "facetAddresses",
          type: "address[]",
        },
      ],
      name: "initializeDiamondClone",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_operator", type: "address" }],
      name: "revokeOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
      name: "setGasCacheForSelector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "blockNumber", type: "uint256" },
      ],
      name: "setImmutableUntilBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes4", name: "_interfaceId", type: "bytes4" },
      ],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_upgradeSaw", type: "address" },
        {
          internalType: "address[]",
          name: "_oldFacetAddresses",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_newFacetAddresses",
          type: "address[]",
        },
        { internalType: "address", name: "_init", type: "address" },
        { internalType: "bytes", name: "_calldata", type: "bytes" },
      ],
      name: "upgradeDiamondSaw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "allOwners",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "allTokensForOwner",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "defaultRoyaltyFraction",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "deleteDefaultRoyalty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "quantity", type: "uint256" },
      ],
      name: "devMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "quantity", type: "uint256" },
      ],
      name: "devMintUnsafe",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "string", name: "_tokenURI", type: "string" },
      ],
      name: "devMintWithTokenURI",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "exists",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "folderStorageBaseURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lockMetadata",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintable",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "metadataLocked",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenOwner", type: "address" },
      ],
      name: "numberMinted",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "removeTokenURIOverrideSelector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "uint256", name: "salePrice", type: "uint256" },
      ],
      name: "royaltyInfo",
      outputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "saleState",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint96", name: "feeNumerator", type: "uint96" },
      ],
      name: "setDefaultRoyalty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_baseURI", type: "string" }],
      name: "setFolderStorageBaseURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxMintable", type: "uint256" },
      ],
      name: "setMaxMintable",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_saleState", type: "uint256" },
      ],
      name: "setSaleState",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
        { internalType: "uint96", name: "_defaultRoyalty", type: "uint96" },
      ],
      name: "setTokenMeta",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_baseURI", type: "string" }],
      name: "setTokenStorageBaseURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "string", name: "_tokenURI", type: "string" },
      ],
      name: "setTokenURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
      name: "setTokenURIOverrideSelector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startTokenId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenStorageBaseURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenURIOverrideSelector",
      outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalMinted",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPaymentSplits",
      outputs: [
        { internalType: "address[]", name: "", type: "address[]" },
        { internalType: "uint256[]", name: "", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "payee",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address payable", name: "account", type: "address" },
      ],
      name: "release",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "releaseAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "contract IERC20", name: "token", type: "address" },
      ],
      name: "releaseAllToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "contract IERC20", name: "token", type: "address" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "releaseToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "released",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "contract IERC20", name: "token", type: "address" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "releasedToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "payees", type: "address[]" },
        { internalType: "uint256[]", name: "shares_", type: "uint256[]" },
      ],
      name: "setPaymentSplits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "shares",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalReleased",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "contract IERC20", name: "token", type: "address" },
      ],
      name: "totalReleasedToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalShares",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lazyMintConfig",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "publicMintPrice",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxMintsPerTxn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxMintsPerWallet",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxMintableAtCurrentStage",
              type: "uint256",
            },
          ],
          internalType: "struct LazyMintLib.LazyMintStorage",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintableAtCurrentStage",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintsPerTransaction",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintsPerWallet",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "quantity", type: "uint256" }],
      name: "publicMint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "publicMintPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxMintsPerTxn", type: "uint256" },
        {
          internalType: "uint256",
          name: "_maxMintsPerWallet",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_maxMintableAtCurrStage",
          type: "uint256",
        },
        { internalType: "uint256", name: "_publicMintPrice", type: "uint256" },
      ],
      name: "setLazyMintConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_maxMintable", type: "uint256" },
      ],
      name: "setMaxMintableAtCurrentStage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_maxMints", type: "uint256" }],
      name: "setMaxMintsPerTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_maxMints", type: "uint256" }],
      name: "setMaxMintsPerWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintPrice", type: "uint256" },
      ],
      name: "setPublicMintPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getMintSigner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "minter", type: "address" }],
      name: "mintNonceForAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_tokenURI", type: "string" },
        { internalType: "bytes", name: "approvalSignature", type: "bytes" },
      ],
      name: "onDemandMint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_signer", type: "address" }],
      name: "setMintSigner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "quantity", type: "uint256" },
      ],
      name: "claimTo",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
  ]
}

const fetchData = async ({ contractAddress, passId }: any) => {
  const contractABI = await getContractABI()
  try {
    const response = await fetch(
      "https://withpaper.com/api/2022-08-12/register-contract",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer 96e2b098-4661-4810-8b16-2b633ffa2e81`,
        },
        body: JSON.stringify({
          chain: process.env.NEXT_PUBLIC_PAPER_NETWORK ?? "Goerli",
          contractAddress: contractAddress,
          contractType: "CUSTOM_CONTRACT",
          contractDefinition: contractABI,
        }),
      }
    )

    const data = await response.json()

    updatePass(passId, data.contractId)

    return data
  } catch (err) {
    console.log(err)
  }
}

const updatePass = async (passId: number, paperData: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const strapi = new Strapi({
    url: apiURL,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  await strapi.update("passes", passId, {
    paper_contract_id: paperData,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
