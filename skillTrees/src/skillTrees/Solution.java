package skillTrees;

import java.util.*;

class Solution {
    public int solution(String skill, String[] skill_trees) {
        int answer = 0;
        // 배열에서 한 단어씩 꺼내기
        for(String st :skill_trees){
            // skill에 포함된 알파벳 순서 저장
            List<Integer> index = new ArrayList<>();
            // 꺼낸 단어 한 글자씩 확인
            for(char s : st.toCharArray()){
                // skill의 알파벳이 있으면 위치 저장
                if(skill.indexOf(s) != -1){
                      index.add(skill.indexOf(s));
                }
            }   
        
            // 순서 체크
            boolean isCheck = true;
            for(int i = 0; i < index.size(); i++){
                // skill순서와 일치하는지 확인
                if(index.get(i) != i){
                    isCheck = false;
                    break;
                } 
            }
            // 순서 맞으면 증가
            if(isCheck){
                answer++;
            }
            
        }

        return answer;
    }
}