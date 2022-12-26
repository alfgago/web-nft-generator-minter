const JuiceExamples = () => {
  return (
    <div>
      <h1>Juice Examples (TODO)</h1>
      <button>Deploy Contract</button>
      <span>Deploys a new smart contract via the vault API</span>

      <button>Dev Mint NFT</button>
      <span>
        Triggers a server side mint of the nft with the custodial admin wallet
      </span>

      <button>On Demand Mint</button>
      <span>Triggers a mint from the webpage with dynamic metadata</span>

      <input type="numbr" placeholder="nft id" />
      <input type="text" placeholder="Address to airdrop to" />
      <button>Airdrop NFT</button>
    </div>
  )
}

export default JuiceExamples
