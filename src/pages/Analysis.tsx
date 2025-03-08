import { Link } from "react-router-dom";

import starIcon from '../assets/textures/star-icon.png'
import thumbnailOriginal from '../assets/thumbnails/thumbnail-original.png'
import thumbnailScrollingGrid from '../assets/thumbnails/thumbnail-scrolling-grid.png'
import thumbnailTabbedGrid from '../assets/thumbnails/thumbnail-tabbed-grid.png'
import thumbnailCrossMediaBar from '../assets/thumbnails/thumbnail-cross-media-bar.png'
import thumbnailSpiral from '../assets/thumbnails/thumbnail-spiral.png'

function Stars({ rating }: { rating: number }) {
  const elements = new Array(5).fill(null).map((_, index) => {
    const isFilled = index < rating;
    return <img src={starIcon} alt="Star" key={index} className={isFilled ? 'star-filled' : 'star-empty'} />
  })

  return (
    <div className="stars">
      <p>
        Rating:
      </p>
      {elements}
    </div>
  )
}

function AnalysisItem({ title, rating, description, thumbnail, link }: { title: string, rating: number, description: string, thumbnail: string, link: string }) {
  return (
    <div className="analysis-item">
      <div>
        <Link to={link}>
          <img src={thumbnail} alt={title} className="analysis-item-thumbnail" />
    </Link>
  </div>
  <div className="analysis-item-text">
        <h2>{title}</h2>
        <Stars rating={rating} />
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function Analysis() {
  return (
    <div className="document-page-container">
      <h1>
        Design Analysis
      </h1>
      <p>
        After getting my hands on the prototypes, here are my personal takeaways.
      </p>
      <div className="analysis-items">
        <AnalysisItem 
          title="Original" 
          rating={1} 
          description="The original version shines in its simplicity, but its pros end there. This approach simply does not scale well past the first few echoes." 
          thumbnail={thumbnailOriginal} 
          link="/" 
        />

        <AnalysisItem 
          title="Original + Acceleration" 
          rating={2} 
          description="Acceleration mediates the issues a little, but it can get a little unweildy." 
          thumbnail={thumbnailOriginal} 
          link="/acceleration" 
        />

        <AnalysisItem 
          title="Scrolling Grid" 
          rating={5} 
          description="I find the two-dimensional grid to be a huge improvement. With many more elements on the screen at once, finding the one you want is much more straightforward. It is interesting that Echoes of Wisdom took this approach this in the main menu echoes view, but elected not to do so in the quick bar. I don't think showing more elements increases the cognitive load too much to be overwhelming during combat." 
          thumbnail={thumbnailScrollingGrid} 
          link="/scrolling-grid" 
        />

        <AnalysisItem 
          title="Tabbed Grid" 
          rating={4} 
          description="The tabbed grid is a pretty convenient way to organize the echoes, and given enough playtime with it I feel like I would become accustomed to which echoes live in which tab. However, while it was a fun sorting exercise, I think the arbitrary nature of which echo belongs to which category makes this solution inferior to the scrolling grid." 
          thumbnail={thumbnailTabbedGrid} 
          link="/tabbed-grid" 
        />

        <AnalysisItem 
          title="Cross Media Bar" 
          rating={3} 
          description='Making the categories for the cross media bar approach was an interesting challenge. There are some echoes that have clear associations (Lizalfos, Lizalfos Lv. 2, Lizalfos Lv. 3), but when I only grouped based on those the horizontal length was still daunting. I think the version I present here which includes some more abstract groupings (Snowball and Spiked Roller are grouped together as "things that roll") preserves enough semantic meaning to still be a meaningful categorization system. I tried to keep at most three elements in a column so that they would always be onscreen. Still, much like the tabbed grid I dislike that the categories are ultimately arbitrary and not tied to gameplay.'
          thumbnail={thumbnailCrossMediaBar} 
          link="/bar" 
        />

        <AnalysisItem 
          title="Spiral" 
          rating={2} 
          description="The spiral is a dark horse idea with some attractive qualities. I like that it parallels the double helix motif present in the wand Zelda uses to conjure echoes, and it is able to display more elements on the screen at once than the original version, but I am fairly confident that playing through the game with this method would result in substantial thumb fatigue. I added support for jumping up and down a level with the trigger buttons which helps a little, but it still doesn't feel as intuitive as a simple grid." 
          thumbnail={thumbnailSpiral} 
          link="/spiral" 
        />
        

        <div>
          <h2>Closing Thoughts</h2>
          <p>
            After weighing the tradeoffs, I find the scrolling grid to be the most attractive choice. It is simple to navigate and allows you to find what you want efficiently so you can get back to combat quickly.
          </p>
          <p>
            Beyond list structure, I think adding the ability to mark certain echoes as your “favorites” would be a welcome addition. Echoes you have favorited would always be sorted at the beginning of the list. Talking to other players, it became clear that we all gravitated towards different echoes as the workhorses of our playthroughs. Giving the player some customization would facilitate this behavior—potentially a drawback if your design goal is to encourage the player to use new echoes, but ultimately a positive tradeoff in my view.
          </p>
        </div>
      </div>
    </div>
  );
}