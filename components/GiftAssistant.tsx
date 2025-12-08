import React, { useState } from 'react';
import { Sparkles, Loader, Send, Package, Gift } from 'lucide-react';
import { generateGiftIdeas, generateMessage } from '../services/geminiService';
import { GiftIdea } from '../types';

export const GiftAssistant: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [preferences, setPreferences] = useState('');
  const [budget, setBudget] = useState('');
  const [ideas, setIdeas] = useState<GiftIdea[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Message Generator State
  const [msgRecipient, setMsgRecipient] = useState('');
  const [msgTone, setMsgTone] = useState('heartfelt');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [msgLoading, setMsgLoading] = useState(false);

  const handleGenerateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !occasion) return;

    setLoading(true);
    // Passing "preferences" instead of interests to match the customization theme
    const results = await generateGiftIdeas(recipient, occasion, preferences || "general luxury items", budget || "flexible");
    setIdeas(results);
    setLoading(false);
  };

  const handleGenerateMessage = async () => {
    if (!msgRecipient) return;
    setMsgLoading(true);
    const msg = await generateMessage(msgRecipient, occasion || 'a special day', msgTone);
    setGeneratedMessage(msg);
    setMsgLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      
      {/* Introduction */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-full mb-4">
          <Gift className="text-brand-600" size={32} />
        </div>
        <h2 className="text-4xl font-serif font-bold text-gray-900">Customize Your Gift Package</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Build the perfect gift box. Tell us about the recipient, and our AI will suggest a curated combination of flowers, skincare, and accessories available in Lahore.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 h-fit">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Design Your Box</h3>
          <form onSubmit={handleGenerateIdeas} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Who is this for?</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Wife, Mother, Friend"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-300 outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="e.g. Birthday, Anniversary"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-300 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Preferences</label>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g. Loves roses, needs skincare for dry skin, likes silver jewelry..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-300 outline-none transition-all resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget (PKR)</label>
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-300 outline-none transition-all"
              >
                <option value="">Flexible</option>
                <option value="Under Rs. 5,000">Under Rs. 5,000</option>
                <option value="Rs. 5,000 - Rs. 10,000">Rs. 5,000 - Rs. 10,000</option>
                <option value="Rs. 10,000 - Rs. 20,000">Rs. 10,000 - Rs. 20,000</option>
                <option value="Luxury (Rs. 20,000+)">Luxury (Rs. 20,000+)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Designing Package...
                </>
              ) : (
                <>
                  <Package className="mr-2" size={20} />
                  View Custom Packages
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {ideas.length > 0 ? (
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-pink-100">
               <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Suggested Packages:</h3>
               <div className="space-y-4">
                 {ideas.map((idea, index) => (
                   <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-50 hover:border-pink-200 transition-colors">
                     <div className="flex items-start justify-between">
                       <h4 className="font-bold text-brand-700">{idea.productName}</h4>
                       <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                         {idea.estimatedPrice}
                       </span>
                     </div>
                     <p className="text-gray-600 text-sm mt-2">{idea.reason}</p>
                   </div>
                 ))}
               </div>
            </div>
          ) : (
            <div className="bg-white/30 border-2 border-dashed border-pink-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-64 text-gray-400">
              <Package size={48} className="mb-4 opacity-50" />
              <p>Your custom package suggestions will appear here.</p>
            </div>
          )}

          {/* Bonus: Message Generator */}
          <div className="bg-gradient-to-br from-brand-50 to-white p-8 rounded-3xl shadow-lg border border-pink-100">
             <div className="flex items-center mb-6">
                <Send className="text-brand-500 mr-3" />
                <h3 className="text-2xl font-serif font-bold text-gray-800">Add a Gift Note</h3>
             </div>
             
             <div className="space-y-4">
               <input
                 type="text"
                 placeholder="Recipient Name"
                 value={msgRecipient}
                 onChange={(e) => setMsgRecipient(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
               />
               <select
                 value={msgTone}
                 onChange={(e) => setMsgTone(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
               >
                 <option value="heartfelt">Heartfelt</option>
                 <option value="funny">Funny</option>
                 <option value="romantic">Romantic</option>
                 <option value="formal">Formal</option>
                 <option value="urdu_poetic">Urdu/Poetic</option>
               </select>

               <button 
                  onClick={handleGenerateMessage}
                  disabled={msgLoading || !msgRecipient}
                  className="w-full bg-white text-brand-600 border border-brand-200 hover:bg-brand-50 font-semibold py-2 rounded-lg text-sm transition-colors"
               >
                 {msgLoading ? 'Writing...' : 'Generate Note'}
               </button>

               {generatedMessage && (
                 <div className="mt-4 p-4 bg-brand-50 rounded-xl relative">
                    <p className="text-brand-800 italic font-serif">"{generatedMessage}"</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};