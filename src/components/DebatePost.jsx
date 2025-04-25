import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments);
  const [nameValue, setNameValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [isAnonymousName, setIsAnoymousName] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameValue.trim() && !isAnonymousName) return;
    if (!commentValue.trim()) return;

    const comment = {
      id: crypto.randomUUID(),
      userName: isAnonymousName ? "AnonimKullanıcı" : nameValue.trim(),
      isAnonymous: isAnonymousName,
      commentText: commentValue.trim(),
    };

    setComments((prev) => [...prev, comment]);
    setIsAnoymousName(false);
    setCommentValue("");
    setNameValue("");
  };
  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          disabled={isAnonymousName}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          required
          onChange={(e) => setCommentValue(e.target.value)}
          value={commentValue}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            required={!nameValue.trim()}
            onChange={(e) => {
              if (e.target.checked) {
                setIsAnoymousName(true);
              } else {
                setIsAnoymousName(false);
              }
            }}
          />
          İsimsiz mi göndereyim?
        </label>
        <button
          type="sumbit"
          disabled={
            (!nameValue.trim() || !isAnonymousName) && !commentValue.trim()
          }
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
