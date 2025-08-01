package home;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

class Solution {
    
    class GiftReceiver {
        // 선물 받은 사람의 받은 개수를 담을 Map 생성
        private Map<String, Integer> rMap;
        // Map 초기화
        public GiftReceiver(){
            this.rMap = new HashMap<>();
        }
        // 선물 개수 구하는 메서드
        public void received(String receiver){
            int count = rMap.getOrDefault(receiver,0)+1;
            rMap.put(receiver,count);
        }
        // 선물 개수 조회용
        public int getCount(String receiver){
            return rMap.getOrDefault(receiver,0);
        }
            
    }
    
    public int solution(String[] friends, String[] gifts) {
        // 준사람, 받은사람:개수 담을 맵 생성
        Map<String, GiftReceiver> giveMap = new HashMap<>();
        // 선물지수 담을 맵
        Map<String, Integer> giftScoreMap = new HashMap<>();
        // 다음 달 받을 선물 수 담을 맵
        Map<String,Integer> nextGiftMap = new HashMap<>();
        
        // 선물 교환이 있는 경우
        // 더 많이 준 사람이 다음 달에 선물 받음
        
        // gifts 준 사람, 받은 사람 나누기
        for(String g : gifts){
            String[] gift = g.split(" ");
            // 키 : 선물 준 사람 / 값 : {받은 사람 : 개수}    
            // 키가 있으면 해당 하는 값 가져오고, 없으면 새로 만들기
            GiftReceiver gr = giveMap.getOrDefault(gift[0], new GiftReceiver());
            // 받은 사람의 선물 개수를 증가시킴    
            gr.received(gift[1]);
            // giveMap에 저장
            giveMap.put(gift[0], gr);          
            
            // 선물 지수(준 개수 - 받은 개수)가 큰 사람이 선물 받음
            giftScoreMap.put(gift[0], giftScoreMap.getOrDefault(gift[0],0)+1);
            giftScoreMap.put(gift[1], giftScoreMap.getOrDefault(gift[1],0)-1);
        }
    
        // 다음 달 받을 선물 맵에 친구들 추가
        for(String f : friends){
            nextGiftMap.put(f,0);
        }
        
        
        // 주고 받은 선물의 수 비교하기
        for(int i=0; i<friends.length; i++){
            for(int j=i+1; j<friends.length; j++){
                // 같은 이름은 비교 안해도 됨
                if(i==j){
                    continue;
                }
                
                String a = friends[i];
                String b = friends[j];
                
                // a가 b에게 준 선물 개수
                int aTob = giveMap.getOrDefault(a, new GiftReceiver()).getCount(b);
                // b가 a에게 준 선물 개수
                int bToa = giveMap.getOrDefault(b, new GiftReceiver()).getCount(a);
             
                // a가 준 선물이 더 많으면 다음 달 받을 선물에 추가
                if(aTob > bToa){
                    nextGiftMap.put(a,nextGiftMap.getOrDefault(a,0)+1);
                    continue;
                // b가 준 선물이 더 많으면 다음 달 받을 선물에 추가
                }else if(aTob < bToa) {
                    nextGiftMap.put(b,nextGiftMap.getOrDefault(b,0)+1);
                    continue;
                // 선물개수가 같거나 교환이 없을 경우    
                }else{
                    // null 값 방지
                    int aScore = giftScoreMap.getOrDefault(a, 0);
                    int bScore = giftScoreMap.getOrDefault(b, 0);
                    
                    // 선물지수 비교해서 a가 크면 a 다음 달 받을 선물에 추가
                    if(aScore > bScore){
                        nextGiftMap.put(a,nextGiftMap.getOrDefault(a,0)+1);
                    // 선물지수 비교해서 b가 크면 b 다음 달 받을 선물에 추가    
                    }else if(aScore < bScore){
                        nextGiftMap.put(b,nextGiftMap.getOrDefault(b,0)+1);
                    }
                }                
                
                }
            }
     
        // 다음달 받을 선물의 최대값 구하기
        int answer = Collections.max(nextGiftMap.values());
            
        return answer;
    }
}
