import java.util.ArrayList;
import java.util.List;

public class Solution {

	 public int[] solution(int[] lottos, int[] win_nums) {
		 
		 	// 알 수 없는 번호의 갯수
		 	int zeroCount = 0;
		 	// 맞는 번호의 갯수
	        int matchCount = 0;
	        
	        // 당첨번호 담을 배열 생성
	        List<Integer> winNumber = new ArrayList<>();
	        
	        // 당첨 번호 배열 리스트로 변환
	        for(int winNum : win_nums) {
	        	winNumber.add(winNum);
	        }
	        
	        // lotto 번호 비교
	        for(int lottoNum : lottos ) {
	        	// 0이 있으면 zeroCount에 플러스
	        	if(lottoNum == 0) {
	        		zeroCount++;
	        	// 당첨번호와 같으면 matchCount에 플러스
	        	}else if(winNumber.contains(lottoNum)) {
	        		matchCount++;
	        	}
	        }
	        
	        // 0이 모두 당첨인 경우
	        int maxCount = zeroCount + matchCount;
	        // 0이 모두 당첨이 아닌 경우
	        int minCount = matchCount;
	        
	        // 최대 일치일 경우의 최고 순위
	        int maxRank =
	        switch(maxCount) {
		        case 6 -> 1;
		        case 5 -> 2;
		        case 4 -> 3;
		        case 3 -> 4;
		        case 2 -> 5;
		        default -> 6;
	        };
	        
	        // 최소 일치일 경우의 최저 순위
	        int minRank =
	        switch(minCount) {
	 	        case 6 -> 1;
	 	        case 5 -> 2;
	    		case 4 -> 3;
	  	        case 3 -> 4;
	  	        case 2 -> 5;
	  	        default -> 6;
	        };
	        
	        // 최고순위, 최저순위 반환
	        int[] answer = {maxRank, minRank};
	        return answer;
	           
	    }
	}
