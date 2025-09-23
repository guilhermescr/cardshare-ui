import {
  Eye,
  Globe,
  Heart,
  MessageCircle,
  Sparkles,
  Trash,
} from 'lucide-react';

export default function MyCardsTab() {
  return (
    <section className="bg-white flex items-center justify-between shadow-md rounded-lg">
      <div>
        <h2>
          <Sparkles /> My Cards (3)
        </h2>
        <p>Manage your published cards</p>
      </div>

      <ul>
        <li>
          <div>
            <div>{/* Card Image */}</div>

            <div>
              <h3>Beautiful Sunset</h3>
              <div>
                <span>
                  <Eye /> 156
                </span>

                <span>
                  <Heart /> 24
                </span>

                <span>
                  <MessageCircle /> 8
                </span>

                <span>2 days ago</span>
              </div>
            </div>
          </div>

          <div>
            <span>
              <Globe /> Public
            </span>

            <div className="ml-2 space-x-2">
              <button type="button">Edit</button>
              <button type="button">View</button>
              <button type="button">
                <Trash className="text-destructive" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
